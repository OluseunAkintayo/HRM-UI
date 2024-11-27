import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      <div className='md:grid md:place-items-center'>
        <div className='space-y-4'>
          <h2 className='text-xl font-bold text-slate-500 md:text-center mb-12'>Profile Overview</h2>
          <img src="/placeholder.jpeg" alt="profile picture" className='md:rounded-full shadow-md w-60' />
          <div className='md:text-center'>
            <p>Oluseun B. Oladiipo</p>
          </div>
        </div>
        <div className='py-4 mt-8'>
          <div className='pt-6 grid grid-cols-1 sm:grid-cols-2 gap-8'>
            <div>
              <p className='font-semibold'>Work Email</p>
              <p className='text-sm'>oluseun.oladiipo@gmail.com</p>
            </div>
            <div className='text-left md:text-right'>
              <p className='font-semibold'>Employee ID</p>
              <p className='text-sm'>123120</p>
            </div>
            <div>
              <p className='font-semibold'>Role</p>
              <p className='text-sm'>Software Developer</p>
            </div>
            <div className='text-left md:text-right'>
              <p className='font-semibold'>Unit</p>
              <p className='text-sm'>Technology</p>
            </div>
            <div>
              <p className='font-semibold'>1st Line Manager</p>
              <p className='text-sm'>Bill Essien</p>
            </div>
            <div className='text-left md:text-right'>
              <p className='font-semibold'>2nd Line Manager</p>
              <p className='text-sm'>Bill Essien</p>
            </div>
            <div className=''>
              <Button>
                <Link to="/profile">Update Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home;
