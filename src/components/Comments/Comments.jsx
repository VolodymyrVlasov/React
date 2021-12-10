// import "./Comments.css"
// import {useRef} from "react";
//
// const Comments = ({task}) => {
//
//     const textMessage = useRef(null)
//
//     const setMessage = () => {
//         setTaskMessages(textMessage.current.value)
//         textMessage.current.value = ""
//     }
//     const isMessageAdd = () => {
//         if (taskState === "Завершить") {
//             return (
//                 <div className="col">
//                     <label className="text-label" htmlFor={"comment"}>Добавить коментарий</label>
//                     <div className="row comments-new_message">
//                 <textarea ref={textMessage} className="comments-add-comment" name="makerComment" id="comment"
//                           rows="4"/>
//                         <button onClick={() => setMessage()} className="comments-send-btn">></button>
//                     </div>
//                 </div>
//             )
//         }
//     }
//
//     return (
//         <>
//             <div className="col">
//                 <p className="text-label">Коментарии</p>
//                 <ul className="comments">
//                     {taskMessages.map((message, index) => {
//                         return (
//                             <li key={index}>
//                                 <p>
//                                     <strong className="text-label--name">{message.authorName}: </strong>
//                                     {message.message}
//                                 </p>
//                             </li>
//                         )
//                     })
//                     }
//                 </ul>
//             </div>
//             {isMessageAdd()}
//         </>
//     )
// }
//
// export default Comments