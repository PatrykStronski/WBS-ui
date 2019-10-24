import { Member } from './member';

export interface Band {
	name: string;
	short_desc: string;
	dateOfFoundation: string;
	members?: Member[];
	genere: string;
}
