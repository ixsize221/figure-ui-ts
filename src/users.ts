class User{
    public name:string
    protected _login:string
    protected _password:string
    protected _grade:number
    constructor(name,login,pass,grade){
        this.name = name;
        this._login = login
        this.grade = grade
    }
    set grade(num){        
        if(num>0)
            this._grade = num
        else
            console.log("grade error")
    }
    get login(){
        return this._login
    }
    set login(str){
        console.log("Логин нельзя изменить")
    }
    set password(str){
        this._password = str
    }
    get password(){
        return "*********"
    }
}

const user1 = new User('Paul McCartney', 'paul', '1234', 3)
const user2 = new User('George Harrison', 'george', '5678', 2)
const user3 = new User('Richard Starkey', 'ringo', '8523', 3)
console.log(user1,user2);
