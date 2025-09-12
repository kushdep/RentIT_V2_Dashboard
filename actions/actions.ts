import {LoginFormStt} from "@/dataInterfaces"

export async function submitLogin(prevState:LoginFormStt,formData:FormData):Promise<LoginFormStt>{
    const email = formData.get('email')
    return {
        email:'',
        password:''
    }
}