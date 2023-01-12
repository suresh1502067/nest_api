 import { Injectable } from "@nestjs/common";
 
 
 @Injectable()
 export class AuthService{
    // test(){// console.log("auth service call")}
    signin(){
      return {body:'sucess signin'}
    }

    signup(){
      return {body:'sucess signup'}
    }  
 }

 // In service, We have to check some login like as connect the database somthing like .