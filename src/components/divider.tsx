import React from 'react'

export const Divider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
      <span className="bg-card text-muted-foreground relative z-10 px-2">
        {children}
      </span>
    </div>
  )
}