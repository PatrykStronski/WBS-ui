import { Member } from './member';

export interface Band {
	id: number;
	name: string;
	short_desc: string;
	dateOfFoundation: string;
	members?: Member[];
	genere: string;
}
