export class User {
    constructor(
        public _id:string = "",
        public firstName:string = "",
        public lastName:string = "",
        public email:string = "",
        public password:string = "",
        public admin:boolean = false,
        public createdAt:string = "",
        public updatedAt:string = "",
    ) {}
}
