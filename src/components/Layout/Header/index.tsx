import { User2 } from 'lucide-react';

const Header = () => {
  return (
    <header className='p-4 w-full'>
      <div className='flex items-center justify-between'>
        <h2>HRM</h2>
        <User2 />
      </div>
    </header>
  )
}

export default Header