import { Button } from '@/components/ui/button';
import React from 'react';
import { IWork } from '../types';
import { AddWorkModal } from './AddWorkModal';
import dayjs from 'dayjs';
import { Loader, Trash } from 'lucide-react';

export const Work = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<Array<IWork> | null>([
    {
      id: "1",
      companyName: "Gate Corporation",
      startDate: new Date("2022-01-01"),
      endDate: new Date("2023-10-20"),
      role: "Systems Administrator",
      summary: "Lorem Ipsum",
      isCurrent: false
    },
    {
      id: "2",
      companyName: "IAC Group",
      startDate: new Date("2022-11-01"),
      endDate: undefined,
      role: "Senior Sys. Admin",
      summary: "Lorem Ipsum",
      isCurrent: true
    }
  ]);

  const remove = (id: string) => {
    const filtered = items?.filter(item => item.id !== id);
    if (filtered) setItems(filtered);
  }

  return (
    <div className='mt-8 w-full'>
      <div className='flex items-center justify-between'>
        <h3>Work History</h3>
        <Button onClick={() => setOpen(true)}>Add work history</Button>
      </div>
      <div className='mt-8'>
        {
          !items || (items && items.length === 0) ?
            <div className='text-center py-8 space-y-2'>
              <p>No items have been added yet</p>
            </div>
            :
            <div>
              {
                items.map(item => (
                  <div key={item.companyName} className='p-4 hover:bg-slate-100 border-b flex gap-4 justify-between'>
                    <div>
                      <p className='font-semibold text-slate-400 text-xl'>{item.companyName}</p>
                      <p>{item.role}</p>
                    </div>
                    <div className='flex flex-col items-end gap-4'>
                      <span>{dayjs(item.startDate).format("MMM. YYYY") + " - " + (item.endDate ? dayjs(item.endDate).format("MMM. YYYY") : "present")}</span>
                      <span>
                        <Button variant="destructive" onClick={() => remove(item.id)}><Trash /></Button>
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
        }
      </div>
      <div className='py-8'>
        <Button className='w-28' disabled={loading}>
          {loading ? <Loader className='animate-spin' /> : "Submit"}
        </Button>
      </div>
      {open && <AddWorkModal open={open} close={() => setOpen(false)} setItems={setItems} items={items} />}
    </div>
  )
}
