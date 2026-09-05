/**
 * The shape of `cv.config.ts`, kept out of it so that file stays plain data.
 * An editor still surfaces these notes on hover.
 */

export type CvRole = {
	jobTitle: string;
	company: string;
	companyUrl?: string;
	location: string;
	/** Free text, so "October 2023" and "2023" are both fine. */
	startDate: string;
	/** Use "Present" for a current role. */
	endDate: string;
	/** One bullet per line. Three to six per role reads best. */
	description: string[];
};

export type CvEducation = {
	degree: string;
	level?: string;
	institution: string;
	year: string;
};

export type CvLanguage = {
	name: string;
	level: string;
	certificateUrl?: string;
};

export type CvProject = {
	name: string;
	description: string;
	url?: string;
};

export type CvPerson = {
	name: string;
	role: string;
	location: string;
	email: string;
	/** Read from `CV_PHONE`, so your number stays out of a public repository. */
	phone?: string;
	linkedin?: string;
	website?: string;
};

export type Cv = {
	person: CvPerson;
	/** The opening paragraph. Three or four sentences. */
	summary: string;
	experience: CvRole[];
	education: CvEducation[];
	skills: string[];
	languages: CvLanguage[];
	projects: CvProject[];
	/** Becomes the downloaded file's name, without the extension. */
	fileName: string;
};
