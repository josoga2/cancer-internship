import Navbar from "./components/Navbar";
import './App.css'
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import InternshipHome from "./pages/InternshipHome";
import Login from "./pages/login"
import Register from "./pages/register"
import { Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute'
import { InternshipContextProvider } from './Context/InternshipContext'
import { InternshipModulesContextProvider } from './Context/InternshipModulesContext'
import { UserContextProvider } from './Context/UserContext'
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Templates/Dashboard";
import TOC from "./components/Templates/TOC";
import { InternshipContentContextProvider } from "./Context/InternshipContentContext";
import TextContent from "./components/Templates/TextContent";
import VideoContent from "./components/Templates/VideoContent";
import CodeTaskContent from "./components/Templates/CodeTaskContent";
import JupyterContent from "./components/Templates/JupyterContent";
import CertificateContent from "./components/Templates/CertificateContent";
import ProjectContent from "./components/Templates/ProjectContent";
import { XPContextProvider } from "./Context/XPContext";
import ThankYou from "./components/Templates/ThankYou";
import PaymentSuccess from "./components/PaymentSuccess";
import BootcampContent from "./components/Templates/BootcampContent";


function Logout(){
  localStorage.clear()
  return <Navigate to={"/login"} />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <div className='text-hb-black'>
      
      <div >
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;700&display=swap" rel="stylesheet"></link>
        
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <> <InternshipContextProvider> <Navbar /> <Home /> <Footer /> </InternshipContextProvider>   </>  } />
            <Route path='*' element={ <> <NotFound />  </> } />
            <Route path='/internships/:internshipId' element={ <> <InternshipContextProvider> <InternshipModulesContextProvider> <Navbar />  <InternshipHome /> <Footer /> </InternshipModulesContextProvider>  </InternshipContextProvider> </>  } />
            <Route path='/login' element={ <Login />  } />
            <Route path='/logout' element={  <Logout />  } />
            <Route path='/internship/payment/success' element={  <PaymentSuccess />  } />
            <Route path='/register' element={ <> <RegisterAndLogout /> </> } />
            <Route path='/dashboard' element={ <> <ProtectedRoute> <UserContextProvider> <InternshipContextProvider> <Dashboard /> </InternshipContextProvider> </UserContextProvider> </ProtectedRoute> </> } />
            <Route path='/internships/:internshipId/TOC/' element={ <> <ProtectedRoute> <InternshipContextProvider> <InternshipModulesContextProvider> <InternshipContentContextProvider>  <TOC /> </InternshipContentContextProvider> </InternshipModulesContextProvider>  </InternshipContextProvider> </ProtectedRoute> </>  } />   
            <Route path='/internships/:internshipId/TOC/:moduleID/text/:contentId' element={ <> <ProtectedRoute> <InternshipContextProvider> <InternshipModulesContextProvider> <InternshipContentContextProvider> <XPContextProvider> <TextContent /> </XPContextProvider> </InternshipContentContextProvider> </InternshipModulesContextProvider>  </InternshipContextProvider> </ProtectedRoute> </>  } />   
            <Route path='/internships/:internshipId/TOC/:moduleID/jupyter/:contentId' element={ <> <ProtectedRoute> <InternshipContextProvider> <InternshipModulesContextProvider> <InternshipContentContextProvider> <XPContextProvider> <JupyterContent /> </XPContextProvider> </InternshipContentContextProvider> </InternshipModulesContextProvider>  </InternshipContextProvider> </ProtectedRoute> </>  } />   
            <Route path='/internships/:internshipId/TOC/:moduleID/video/:contentId' element={ <> <ProtectedRoute> <InternshipContextProvider> <InternshipModulesContextProvider> <InternshipContentContextProvider> <XPContextProvider> <VideoContent /> </XPContextProvider> </InternshipContentContextProvider> </InternshipModulesContextProvider>  </InternshipContextProvider> </ProtectedRoute> </>  } />   
            <Route path='/internships/:internshipId/TOC/:moduleID/coding/:contentId' element={ <> <ProtectedRoute> <UserContextProvider> <InternshipContextProvider> <InternshipModulesContextProvider> <InternshipContentContextProvider> <XPContextProvider> <CodeTaskContent /> </XPContextProvider> </InternshipContentContextProvider> </InternshipModulesContextProvider>  </InternshipContextProvider> </UserContextProvider> </ProtectedRoute> </>  } /> 
            <Route path='/internships/:internshipId/TOC/:moduleID/project/:contentId' element={ <> <ProtectedRoute> <InternshipContextProvider> <InternshipModulesContextProvider> <InternshipContentContextProvider> <XPContextProvider> <ProjectContent /> </XPContextProvider> </InternshipContentContextProvider> </InternshipModulesContextProvider>  </InternshipContextProvider> </ProtectedRoute> </>  } />  
            <Route path='/internships/:internshipId/TOC/:moduleID/certification/:contentId' element={ <> <ProtectedRoute> <InternshipContextProvider> <InternshipModulesContextProvider> <InternshipContentContextProvider> <XPContextProvider> <CertificateContent /> </XPContextProvider>  </InternshipContentContextProvider> </InternshipModulesContextProvider>  </InternshipContextProvider> </ProtectedRoute> </>  } /> 
            <Route path='/internships/ThankYou/' element={ <> <ProtectedRoute> <InternshipContextProvider> <InternshipModulesContextProvider> <InternshipContentContextProvider>  <ThankYou /> </InternshipContentContextProvider> </InternshipModulesContextProvider>  </InternshipContextProvider> </ProtectedRoute> </>  } />   
            <Route path='/internships/:internshipId/TOC/:moduleID/bootcamp/:contentId' element={ <> <ProtectedRoute> <InternshipContextProvider> <InternshipModulesContextProvider> <InternshipContentContextProvider> <XPContextProvider>   <BootcampContent /> </XPContextProvider>  </InternshipContentContextProvider> </InternshipModulesContextProvider>  </InternshipContextProvider> </ProtectedRoute> </>  } />   
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
