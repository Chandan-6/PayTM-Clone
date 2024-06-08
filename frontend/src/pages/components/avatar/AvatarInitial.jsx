export default function AvatarInitial(props){
    return(
        <div className={`relative rounded-full text-zinc-800 p-5 flex justify-center items-center ${props.bgCustom}`}>
        <p className="absolute uppercase">{props.initial}</p>
      </div>
    )
}