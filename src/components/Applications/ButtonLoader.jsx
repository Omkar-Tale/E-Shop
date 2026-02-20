import React from 'react'
import { Button } from '../ui/button'
import { Loader2 } from "lucide-react";
import { cn } from '@/lib/utils';

const ButtonLoader = ({text, className, loading, onClick, type, ...props}) => {
  return (
            <Button type={type} className={cn("", className)} onClick={onClick} disabled={loading} {...props}>
                {loading && <Loader2 className='animate-spin'/>}
                {text}
            </Button>
  )
}

export default ButtonLoader