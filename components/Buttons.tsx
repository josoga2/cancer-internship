function Buttons(inputText: string, inputLink: string){
    return(
        <main>
            <div className="hidden md:flex font-semibold rounded-md border-4 border-hbblue-3 text-white hover:bg-white bg-hbblue-3 hover:text-hbblue-3 w-fit  text-center py-2 text-base px-5"> <a href={inputLink}>{inputText} </a> </div>
            <div className="md:hidden font-semibold rounded-md border-4 border-hbblue-3 text-white hover:bg-white bg-hbblue-3 hover:text-hbblue-3 w-fit  text-center text-sm py-2 px-5"> <a href={inputLink}>{inputText} </a> </div>
            
        </main>
    )
};

export default Buttons;

