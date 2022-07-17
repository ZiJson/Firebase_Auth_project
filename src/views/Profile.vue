<template>
    <div class="app">
        <div class="back">PRO FILE</div>
        <div class="container">
            <h1 class="word">YOUR EMAIL:</h1>
            <h1>{{user_email}}</h1>
            <div v-if="bool">
                <div class="message animate__animated" :class="{ animate__headShake :active}">
                    {{message}}
                </div>
                <input type="password" placeholder="Recent Password" @keyup.enter="change_pw()" v-model="oldpassword">
                <br>
                <input type="password" placeholder="New Password" @keyup.enter="change_pw()" v-model="newpassword">
                <br>
                <button type="submit"  @click.prevent="change_pw() ">Submit</button>
                <br>
                <button type="submit"  @click.prevent="switch_bool()">Back</button>
            </div>
            <div v-if="!bool">
                <button type="submit"  @click.prevent="switch_bool()">Change Password</button>
                <br>
                <button type="submit"  @click.prevent="logout()">Logout</button>
                
            </div>
            
        </div>
    </div>
</template>

<script>
    import { auth } from "../../firebase_config";
    import {  onAuthStateChanged, updatePassword ,reauthenticateWithCredential,EmailAuthProvider, } from "firebase/auth";
    import 'animate.css';
    

   
    export default {
        data(){
            return {
                user: null,
                oldpassword: "",
                newpassword: "",
                user_email : "",
                bool : false,
                message : "",
                active: false ,
            }
        },
        created() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log("登入狀態");
                    this.user = user;
                    this.user_email = user.email;
                    // ...
                } else {
                    console.log("未登入狀態");
                    this.$router.push('/');
                }
            })
        },
        methods: {
            logout() {
            auth.signOut().then(() => {
                auth.onAuthStateChanged(() => {
                this.$router.push('/')
                })
            })
            },
            switch_bool() {
                this.bool = !this.bool;
            },



            change_pw() {
                const credential = EmailAuthProvider.credential(
                    auth.currentUser.email,
                    this.oldpassword
                )
                reauthenticateWithCredential(this.user, credential).then(() => {
                    console.log("驗證成功")
                    if(this.newpassword==""){
                        this.message = 'please type your new password';
                        this.move();
                    }
                    else{
                        updatePassword(this.user, this.newpassword).then(() => {
                            console.log("更新成功")
                            this.message = "password update successfully";
                            this.oldpassword = this.newpassword = "";

                        }).catch((error) => {
                            console.log(error.code);
                            if(error.code=='auth/weak-password'){
                            this.message = 'weak password';
                            }
                            this.move();
                        });
                        
                    }
                }).catch((error) => {
                    const errorCode = error.code;
                    console.log(error.code);
                    if(errorCode=='auth/wrong-password'){
                        this.message = 'wrong password';
                    }
                    else if(errorCode=='auth/internal-error'){
                        this.message = 'please type your recent password';
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

<style>

    h1.word {
        
        background-color: #6b9080;
        color: white;
    }
</style>