import React from 'react';
import { useRouter } from 'next/router';
import { useMoralis } from 'react-moralis';
import { useEffect } from 'react'
import Moralis from 'moralis'

export default function Dashboard() {

    const { isAuthenticated, logout } = useMoralis()
    const { router } = useRouter()

    useEffect(() => {
        if(!isAuthenticated){
            return router.push("/")
        }
    }, [isAuthenticated, router])

    const sendETH = async ()=> {
        console.log(`testing testNET`)
        try{
            //
            await Moralis.Web3.enableWeb3()
            const result = await Moralis.Web3.transfer({
                type: "native",
                amount: Moralis.Units.ETH("0.1"),
                receiver: "0x88cD2f6A1af6d9b022b63239B21D14903Fa50D63"
            })
            console.log(result)
            alert("Transfer of fund was successfull")
        }catch(e){
            console.error(e)
            //throw new Error()
            alert("something went wrong!")
        }
    }

    return (
        <div>
            <div>Welcome to the MetaMask Dashboard!</div>

            <button
                className="px-7 mb-5 py-4 text-xl rounded-xl bg-yellow-300"
                onClick={sendETH}
            >
                Send 0.1ETH to a friend!
            </button>

            <button
                className="mg-30 px-7 mb-5 py-4 text-xl rounded-xl bg-red-400 animate-pulse"
                onClick={() => {
                    console.log('logout console')
                    //return logout
                }}
            >
                Logout
            </button>
        </div>
    );
}
