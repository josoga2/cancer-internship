function Whitebutton(inputText: string, inputLink: string){
    return(
        <main>
            <div className="hidden md:flex font-semibold rounded-md border-4 border-hbblue-3 text-hbblue-3 hover:bg-figma-grey bg-figma-grey hover:text-hbblue-3 w-fit  text-center py-2 text-base px-5"> <p>{inputText} </p> </div>
            <div className="md:hidden font-semibold rounded-md border-4 border-hbblue-3 text-hbblue-3 hover:bg-figma-grey bg-figma-grey hover:text-hbblue-3 w-fit  text-center text-sm py-2 px-5"> <p>{inputText} </p> </div>
            
        </main>
    )
};

export default Whitebutton;