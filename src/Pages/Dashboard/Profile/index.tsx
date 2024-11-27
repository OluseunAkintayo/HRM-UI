import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Personal } from './components/Personal';
import { Education } from './components/Education/index';
import { Work } from './components/Work';


const Profile = () => {
  return (
    <Layout>
      <h3 className='text-xl font-bold text-slate-500 border-b py-4'>Profile Settings</h3>
      <div className='mt-8'>
        <Tabs defaultValue="personal">
          <TabsList className='flex-col h-full w-full sm:w-auto sm:flex-row md:inline-flex'>
            <TabsTrigger className='w-full text-left' value="personal">Personal</TabsTrigger>
            <TabsTrigger className='w-full' value="education">Education</TabsTrigger>
            <TabsTrigger className='w-full' value="experience">Work History</TabsTrigger>
            <TabsTrigger className='w-full' value="payment">Payment</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <Personal />
          </TabsContent>
          <TabsContent value="education"><Education /></TabsContent>
          <TabsContent value="experience"><Work /></TabsContent>
          <TabsContent value="payment">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

export default Profile;