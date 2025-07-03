export class ProjectModel {
  _id?: string;
  name: string;
  description: string;
  category: string;
  year: number;
  langs: string;
  image: string;

  constructor(
    name: string,
    description: string,
    category: string,
    year: number,
    langs: string,
    image: string,
    _id?: string
  ) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.year = year;
    this.langs = langs;
    this.image = image;
    this._id = _id;
  }
}
