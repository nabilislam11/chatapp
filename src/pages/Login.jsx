import React from 'react'
import login from '../assets/login.png'
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react'
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
// import { InfinitySpin } from 'react-loader-spinner'
import { useDispatch } from 'react-redux';
import { userLoginfo } from '../slice/userSlice';
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setshow] = useState(false)
    // const [loading, setloading] = useState(false)
    const [emailErr, setEmailErr] = useState("")
    const [passwordErr, setPassworderr] = useState("")
    const auth = getAuth();
    const provider = new GoogleAuthProvider()
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailErr("")
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        passwordErr("")
    }
    const handleLogin = (e) => {
        if (!email) {
            setEmailErr("Enter yoour email address");

        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailValidErr("Emter your valid email")

            }
        }
        if (!password) {
            setPassworderr("Enter your password")

        } if (email && password) {
            setEmail("")
            setPassword("")

        }
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log("successfull");
                
                toast.success("Login successefully done")
                // setloading(true)
                console.log(user.user);
                
                dispatch(userLoginfo(user.user) );
                localStorage.setItem("userLoginfo",JSON.stringify(user) )
                setTimeout(() => {
                    navigate("/")

                }, 2000);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                toast.error("login unsuccessefull")
                // setloading(false)
            }

            );
    }
    const handleGoogleSignin = () => {
        signInWithPopup(auth, provider)
            .then((user) => {
                console.log(user);
                console.log("success");
                setTimeout(() => {
                    navigate("/")

                }, 2000);



            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);

            });
    }

    return (
        <div className="flex flex-wrap ">
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            <div className=" lg:w-[55%] pl-[147px] pt-[220px] ">
                <h1 className='font-primary font-bold text-[33px] text-secondary ' > Login to your account!</h1>
                <div onClick={handleGoogleSignin} className="flex  cursor-pointer items-center justify-center gap-2.5 border-1 border-gray-300   w-[220px]  rounded-[7px] mt-[29px] mb-[32px] ">
                    <FcGoogle className='size-4  ' />
                    <p className='font-primary font-semibold text-[13px] text-secondary pt-[23px] pb-[21px]'>Login with Google</p>
                </div>
                <div className="mt-[60px] ">
                    <div className="relative my-[34px] w-[368px]">
                        <input onChange={handleEmail} value={email} className='block px-[26px] py-[26px] w-full xl:w-[368px] text-xl text-secondary font-semibold bg-transparent rounded-lg border-b-2   border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary/30 peer" placeholder=" " />' type="email" />
                        <p className='bg-red-500 text-white mt-0.5 rounded-lg w-[298px] px-4 '> {emailErr} </p>

                        <label for="floating_outlined2" class="absolute text-sm text-secondary/70 duration-300 transform -translate-y-4 top-2 z-10 origin-[0] bg-white  px-4 peer-focus:px-4 peer-focus:text-secondary/70  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-2/5 rtl:peer-focus:left-auto start-4">Email Address</label>
                    </div>
                    <div className="relative my-[34px] w-[368px]">
                        <input onChange={handlePassword}
                            value={password}
                            className='block px-[26px] py-[26px] w-full xl:w-[368px] text-xl text-secondary font-semibold bg-transparent rounded-lg border-b-2   border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-secondary/30 peer" placeholder=" " />' type={show ? "text" : "password"} />
                        <p className='bg-red-500 text-white mt-0.5 rounded-lg w-[298px]  px-4 '>{passwordErr}</p>
                        {
                            show ?
                                <RiEyeFill onClick={() => setshow(!show)} className=' absolute top-[33px] right-[27px] ' />
                                :
                                <RiEyeCloseLine onClick={() => setshow(!show)} className=' absolute top-[33px] right-[27px] ' />
                        }
                        <label for="floating_outlined2" class="absolute text-sm text-secondary/70 duration-300 transform  -translate-y-4 top-2 z-10 origin-[0] bg-white  px-4 peer-focus:px-4 peer-focus:text-secondary/70  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-2/5 rtl:peer-focus:left-auto start-4">Enter your password</label>
                    </div>
                    <div className="w-[424px] flex flex-col items-center ">
                        {
                            // loading ?
                            //     (<InfinitySpin
                            //         visible={true}
                            //         width="200"
                            //         color="#000"
                            //         ariaLabel="infinity-spin-loading"
                            //     />)
                            //     :
                                <button onClick={handleLogin} className=' w-full font-semibold font-nunito text-[20px] text-white py-[26px]  mb-[35px] px-[122px] bg-black rounded-[8px] mt-[51px]  ' >Login to Continue</button>
                        }

                        <p className='font-reguler font-primary text-[13px]  text-secondary  pl-[17px] '>Don’t have an account ?<Link to="/registration" className='text-orange-500 font-bold cursor-pointer'>Sign In</Link> </p>
                    </div>
                </div>
            </div>
            <div className=" lg:w-[45%] ">
                <img className='w-full h-screen object-cover' src={login} alt="#login" />
            </div>
        </div >
    )
}

export default Login