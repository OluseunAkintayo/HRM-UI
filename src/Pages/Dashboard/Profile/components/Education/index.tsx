import { Button } from '@/components/ui/button';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IEducation } from '../types';
import { AddItemModal } from './AddItemModal';

export const Education = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<Array<IEducation> | null>(null);

  return (
    <div className='mt-8 w-full'>
      <div>
        <Button onClick={() => setOpen(true)}>Add Item</Button>
      </div>
      <div className='mt-5'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>School Name</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Qualification Obtained</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              !items || (items && items.length === 0) ?
                <TableRow>
                  <TableCell className="font-medium text-center py-4 h-20 text-slate-500" colSpan={4}>No items have been added yet</TableCell>
                </TableRow>
                :
                items.map(item => (
                  <TableRow>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.startYear + " - " + item.endYear}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.qualificationObtained}</TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </div>
      {open && <AddItemModal open={open} close={() => setOpen(false)} setItems={setItems} items={items} />}
    </div>
  )
}
