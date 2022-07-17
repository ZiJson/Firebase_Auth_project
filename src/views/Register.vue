<template>
    <div class="app">
        <div class="back">SIGN UP</div>
        <div class="container" >
            <div class="message animate__animated" :class="{ animate__headShake :active}">
                {{message}}
            </div>
            <input type="email" placeholder="Email" @keyup.enter="login()" v-model="user.email">
            <br>
            <input type="password" @keyup.enter="login()" placeholder="Password" v-model="user.password">
            <br>
            <button type="submit" @click.prevent="register()">Sign up</button>
            <br>
            <br>
            <br>
            <router-link to="/" >go login</router-link>
        </div>
    </div>
</template>

<script>
    import { auth } from "../../firebase_config";
    import { createUserWithEmailAndPassword } from "firebase/auth";
    import 'animate.css';

    export default {
        data() {
            return {
                user: {
                    email : "",
                    password : "",
                },
                message: "",
                active: false ,
            }
        },
        
        methods : {
            register(){
                createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                    console.log("註冊成功");
                    this.message = "sign up successfully";
                    this.$router.push('/');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    console.log(errorCode);
                    if(errorCode=="auth/email-already-in-use"){
                        this.message = 'email alreadly in use';
                    }
                    else if(errorCode=='auth/invalid-email'){
                        this.message = 'invalid email';
                    }
                    else if(errorCode=='auth/weak-password'){
                        this.message = 'weak password';
                    }
                    else if(errorCode=='auth/internal-error'){
                        this.message = 'invalid password';
                    }
                    this.move();
                });
            },
            move() {
                this.active = true
                setTimeout(() => {
                    this.active = false
                }, 1500)
            }
        }
    }
    


</script>

