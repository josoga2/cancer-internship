import Form from '../components/Form';
const Register = () => {
  return (
    <div className='bg-hackbio-green-light h-screen'>
        
        <Form isLogin={false} route="api/user/register/" method="register"/>
    </div>
  );
}

export default Register;
