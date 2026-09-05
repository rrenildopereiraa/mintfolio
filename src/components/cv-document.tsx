import path from "node:path";
import {
	Document,
	Font,
	Link,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
import { Fragment, type ReactNode } from "react";
import { cv } from "../../cv.config.ts";
import type { CvPerson } from "../lib/cv.ts";

/**
 * The light half of the palette in `yumma.config.mjs`, spelled out.
 *
 * Print only, so there is no dark half: a PDF has no `color-scheme` to follow,
 * and a CV is looked at on white, half the time on paper. The values are
 * copied rather than imported because the Yumma CSS config is CSS, not
 * something react-pdf can read. Keep them in step by hand if you change the
 * accent.
 *
 * The page itself is left pure white rather than the site's #fbfdfc. On screen
 * that tint reads as warmth; through a printer it reads as a gray box with
 * toner around the margins.
 */
const COLOR = {
	text: "#0d1b19",
	dim: "#5a706b",
	accent: "#0f766e",
	border: "#dde8e5",
};

/**
 * Paths are spelled out one per weight so Turbopack can resolve them
 * statically; a composed path makes it trace the whole project into the
 * server bundle.
 */
Font.register({
	family: "Geist",
	fonts: [
		{
			src: path.join(process.cwd(), "src/assets/fonts/geist-400.ttf"),
			fontWeight: 400,
		},
		{
			src: path.join(process.cwd(), "src/assets/fonts/geist-500.ttf"),
			fontWeight: 500,
		},
		{
			src: path.join(process.cwd(), "src/assets/fonts/geist-700.ttf"),
			fontWeight: 700,
		},
	],
});

/**
 * Stops the renderer breaking a long URL or a hyphenated word across lines,
 * which is the default and looks like a typo in a document this short.
 */
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
	page: {
		paddingTop: 38,
		paddingBottom: 26,
		paddingHorizontal: 46,
		fontFamily: "Geist",
		fontSize: 9.5,
		lineHeight: 1.36,
		color: COLOR.text,
	},

	// No letterSpacing here: it makes the renderer position each word
	// separately, and the name then extracts as two lines instead of one.
	name: { fontSize: 22, fontWeight: 700, lineHeight: 1.2 },
	role: {
		marginTop: 3,
		fontSize: 10.5,
		fontWeight: 500,
		color: COLOR.accent,
	},
	contact: {
		marginTop: 6,
		flexDirection: "row",
		flexWrap: "wrap",
		fontSize: 8.5,
		color: COLOR.dim,
	},
	separator: { marginHorizontal: 5, color: COLOR.border },

	section: { marginTop: 8 },

	// Tracking is deliberately absent, for the same reason as the name above:
	// it splits the run, and "EDUCATION" then extracts as "E D U C AT I O N".
	// Section headings are the strings an applicant tracking system looks for,
	// so they have to survive copy and paste intact. Uppercase and weight carry
	// the hierarchy instead.
	sectionTitle: {
		fontSize: 8.5,
		fontWeight: 700,
		textTransform: "uppercase",
		color: COLOR.dim,
	},
	rule: {
		marginTop: 3.5,
		marginBottom: 7,
		borderBottomWidth: 0.75,
		borderBottomColor: COLOR.border,
	},

	entry: { marginBottom: 6 },
	entryHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
	},
	jobTitle: { fontSize: 10.5, fontWeight: 700 },
	dates: { fontSize: 8.5, color: COLOR.dim },
	company: { marginTop: 1, fontSize: 9.5, fontWeight: 500, color: COLOR.dim },

	bullets: { marginTop: 4 },
	bullet: { flexDirection: "row", marginBottom: 1 },
	// A fixed-width gutter, so wrapped lines align under the text and not
	// under the dot.
	dot: { width: 10, color: COLOR.dim },
	bulletText: { flex: 1 },

	project: { marginBottom: 3 },
	link: { color: COLOR.accent, textDecoration: "none" },
	row: { flexDirection: "row", justifyContent: "space-between" },
});

/** Joined by a hairline pipe so the contact line reads as one row. */
function Contact({ person }: { person: CvPerson }) {
	const items: { key: string; node: ReactNode }[] = [
		{
			key: "email",
			node: (
				<Link src={`mailto:${person.email}`} style={styles.link}>
					{person.email}
				</Link>
			),
		},
	];

	if (person.phone) {
		items.push({ key: "phone", node: <Text>{person.phone}</Text> });
	}

	items.push({ key: "location", node: <Text>{person.location}</Text> });

	if (person.linkedin) {
		items.push({
			key: "linkedin",
			node: (
				<Link src={person.linkedin} style={styles.link}>
					{person.linkedin.replace(/^https?:\/\//, "")}
				</Link>
			),
		});
	}

	if (person.website) {
		items.push({
			key: "website",
			node: (
				<Link src={person.website} style={styles.link}>
					{person.website.replace(/^https?:\/\//, "")}
				</Link>
			),
		});
	}

	return (
		<View style={styles.contact}>
			{items.map((item, index) => (
				<Fragment key={item.key}>
					{index > 0 && <Text style={styles.separator}>|</Text>}
					{item.node}
				</Fragment>
			))}
		</View>
	);
}

/**
 * Headings are the plain nouns an applicant tracking system expects to find,
 * not clever ones. This is the one place in the project where being
 * predictable is the whole point.
 */
function Section({ title, children }: { title: string; children: ReactNode }) {
	return (
		<View style={styles.section} minPresenceAhead={40}>
			<Text style={styles.sectionTitle}>{title}</Text>
			<View style={styles.rule} />
			{children}
		</View>
	);
}

function Bullets({ items }: { items: string[] }) {
	return (
		<View style={styles.bullets}>
			{items.map((item) => (
				<View key={item} style={styles.bullet}>
					<Text style={styles.dot}>•</Text>
					<Text style={styles.bulletText}>{item}</Text>
				</View>
			))}
		</View>
	);
}

export function CvDocument() {
	const { person } = cv;

	return (
		<Document
			title={`${person.name} · ${person.role}`}
			author={person.name}
			subject={`CV of ${person.name}`}
			creator={person.website ?? person.name}
			producer={person.website ?? person.name}
		>
			<Page size="A4" style={styles.page}>
				<View>
					<Text style={styles.name}>{person.name}</Text>
					<Text style={styles.role}>{person.role}</Text>
					<Contact person={person} />
				</View>

				<Section title="Profile">
					<Text>{cv.summary}</Text>
				</Section>

				<Section title="Experience">
					{cv.experience.map((job) => (
						<View
							key={`${job.company}-${job.jobTitle}`}
							style={styles.entry}
							wrap={false}
						>
							<View style={styles.entryHeader}>
								<Text style={styles.jobTitle}>{job.jobTitle}</Text>
								<Text style={styles.dates}>
									{job.startDate} – {job.endDate}
								</Text>
							</View>
							<Text style={styles.company}>
								{job.companyUrl ? (
									<Link src={job.companyUrl} style={styles.link}>
										{job.company}
									</Link>
								) : (
									job.company
								)}
								{` · ${job.location}`}
							</Text>
							<Bullets items={job.description} />
						</View>
					))}
				</Section>

				<Section title="Projects">
					{cv.projects.map((project) => (
						<View key={project.name} style={styles.project}>
							<Text>
								<Text style={{ fontWeight: 700 }}>
									{project.url ? (
										<Link src={project.url} style={styles.link}>
											{project.name}
										</Link>
									) : (
										project.name
									)}
								</Text>
								<Text style={{ color: COLOR.dim }}>
									{` · ${project.description}`}
								</Text>
							</Text>
						</View>
					))}
				</Section>

				<Section title="Education">
					{cv.education.map((entry) => (
						<View key={entry.institution} style={styles.entry} wrap={false}>
							<View style={styles.entryHeader}>
								<Text style={styles.jobTitle}>
									{entry.degree}
									{entry.level ? `, ${entry.level}` : ""}
								</Text>
								<Text style={styles.dates}>{entry.year}</Text>
							</View>
							<Text style={styles.company}>{entry.institution}</Text>
						</View>
					))}
				</Section>

				<Section title="Skills">
					<Text>{cv.skills.join(" · ")}</Text>
				</Section>

				<Section title="Languages">
					<Text>
						{cv.languages.map((language, index) => (
							<Text key={language.name}>
								{index > 0 ? " · " : ""}
								<Text style={{ fontWeight: 500 }}>{language.name}</Text>
								{`: ${language.level}`}
								{language.certificateUrl && (
									<Link src={language.certificateUrl} style={styles.link}>
										{" (certificate)"}
									</Link>
								)}
							</Text>
						))}
					</Text>
				</Section>
			</Page>
		</Document>
	);
}
