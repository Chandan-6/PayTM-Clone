import Balance from "../components/dashboard/Balance"
import Intro from "../components/dashboard/Intro"
import Users from "../components/dashboard/Users"


export default function Dashboard(){
    
    return(
        <div className="flex flex-col justify-center items-center mx-auto w-[80%] mt-16">
            <Intro />

            <div className="mt-7 w-full">
                <Balance />
                <Users/>
            </div>


        </div>
    )
}