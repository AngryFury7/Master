import React, { useEffect,useState,useRef } from 'react'
import './MainPage.css'
import { WordsArr } from './WordsImport'
import {gsap} from 'gsap'



const MainPage = () => {
    let [Word_of_the_day,ChangeWord] = useState("");
    let [Index,changeIndex] = useState(0);
    let Words = useRef([]);
    const Key = useRef();
    useEffect(() => 
    {
         ChangeWord(WordsArr[Math.floor(Math.random() * WordsArr.length)]); // will choose a random index 
    },[])



    const tl = gsap.timeline(); 
    tl.set(Key.current,{opacity : 0 })


    const ManageKeys = (e) => {
        const pressedKey = e.key ; 
        if((pressedKey.length ===  1 || pressedKey === "Enter" || pressedKey === "Backspace") &&  !Number(pressedKey) && Number(pressedKey) !== 0 )
        {

            if(pressedKey !== "Enter" && pressedKey !== "Backspace")
            {
                
               if ((Index + 1)* 5 !== Words.current.length) Words.current.push(pressedKey.toUpperCase()); // the thing is this only 
            }

            if(pressedKey === "Enter")
            {
                if ((Index + 1)* 5 === Words.current.length && Index < 6)
                {
                    let PosArr = [];
                    for(let i = Index*5 , j = 0  ; i < (Index + 1)*5 ; i ++ , j++ )
                    {
                        let  MyLetter= Words.current[i];
                        let ActualLetter = Word_of_the_day[j];
                        if(MyLetter === ActualLetter)
                        {
                            PosArr.push({status : 1 , i , MyLetter});
                            for(let q = 0 ; q < PosArr.length ; q++)
                            {
                                if(PosArr[q].status === 0 && PosArr[q].MyLetter === MyLetter)
                                {
                                    PosArr.splice(q,1);
                                }
                            }
                        }
                        if (Word_of_the_day.includes(MyLetter) && MyLetter !== ActualLetter) // included but at random pos 
                        {
                            let Count = 0 ;  
                            for(let k = 0 ; k < 5 ; k++)
                            {
                                if(MyLetter === Word_of_the_day[k])
                                {
                                    Count++;
                                }
                            } 

                            let IncludingCount = 0 ; 
                            let obj = {status : 0,i,MyLetter}
                            for(let n = 0 ; n < PosArr.length ; n++)
                            {
                                if(PosArr[n].MyLetter === obj.MyLetter)
                                {
                                    IncludingCount++;
                                }
                            }
                            if(IncludingCount < Count && !(IncludingCount === 0 && Count === 0 ))
                            {
                                 {PosArr.push(obj)}
                            }
                        } 

                    }

                    for(let a = 0 ; a < PosArr.length ; a ++  )
                    {
                        let index = PosArr[a].i; 
                        let staus = PosArr[a].status;

                        if(staus === 0 )
                        {
                            document.querySelectorAll('.InputBlocks')[index].classList.add('contains')
                        }

                        if(staus === 1 )
                        {
                            document.querySelectorAll('.InputBlocks')[index].classList.add('correctPos')
                        }
                    }
                    if(Index === 5 )
                    {
                        console.log(Word_of_the_day)
                    }
                    changeIndex(Index + 1); 
                }

            }

            if(pressedKey === "Backspace")
            {
                if ((Index)* 5 <  Words.current.length && Index < 6)
                {
                    document.querySelectorAll('.InputBlocks')[Words.current.length - 1].innerHTML = "";
                    Words.current.splice(Words.current.length -1 , 1 );
                }  
            }

            document.querySelectorAll('.InputBlocks').forEach((value,index) => {
                let word = Words.current[index] ; 
                if(word)
                {
                    value.innerHTML = word ; 
                }
            })
        }
    } 


    useEffect(() => {
        document.addEventListener('keydown',ManageKeys);
        return () => document.removeEventListener('keydown',ManageKeys)
    },[Index,Word_of_the_day])

    return(
    <div className='Page_wrapper'>
        <div className="top_container_wrapper">
            <span>Wordle</span>
        </div>

        <div className="middle_container_wrapper">
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
            <div className="InputBlocks"></div>
        </div>

        <div className="keyboard_container_wrapper">
            <div ref={Key} className="KeyPressed"></div>
        </div>
    </div>
    )
  
}
// and its all done now i don't want a validation check for this one so yeah its all fine to do so 


export default MainPage
