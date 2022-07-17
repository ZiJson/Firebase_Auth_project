<template>
    <div class="app">
        <div class="back">LOGIN</div>
        <div class="container">
            <div class="message animate__animated" :class="{ animate__headShake :active}"  >
                {{message}}
            </div>
            <input type="email" placeholder="Email" @keyup.enter="login()" v-model="user.email">
            <br>
            <input type="password" @keyup.enter="login()" placeholder="Password" v-model="user.password">
            <br>
            <button type="submit" @click.prevent="login();">Login</button>
            <br>
            <br>
            <br>
            <router-link to="/register" >go sign up</router-link>
        </div>
        
    </div>
    
</template>

<script>
    import { auth } from "../../firebase_config";
    import { signInWithEmailAndPassword } from "firebase/auth";
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
            login(){
                signInWithEmailAndPassword(auth, this.user.email, this.user.password)
                .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("登入成功");
                this.$router.push('/profile');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                    if(errorCode=="auth/user-not-found"){
                        this.message = 'user not found';
                    }
                    else if(errorCode=='auth/invalid-email'){
                        this.message = 'invalid email';
                    }
                    else if(errorCode=='auth/wrong-password'){
                        this.message = 'wrong password';
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