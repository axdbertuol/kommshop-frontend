'use client'
import { signOut } from '@/app/lib/actions/form/signout'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'
import { Button } from '@/app/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { useRouter } from '@/navigation'
import { AuthProvidersEnum, LoginResponseUserDto } from 'kommshop-types'
import { googleLogout } from '@react-oauth/google'

export function UserNav({ user }: { user: LoginResponseUserDto | null }) {
  const router = useRouter()

  if (!user) {
    return (
      <Button
        data-testid="signin-button"
        onClick={() => router.push('/signin')}
      >
        Sign in
      </Button>
    )
  }

  const handleSignout = () => {
    signOut().then(({ success }) => {
      console.log('Sign out', success)
      if (success) {
        if (user.provider === AuthProvidersEnum.google) googleLogout()
        router.refresh()
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          data-testid="trigger-button"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/avatars/01.png"
              alt="@shadcn"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
        data-testid="dropdown-content"
      >
        <DropdownMenuLabel
          data-testid={'dropdown-content-label'}
          className="font-normal"
        >
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.firstName ?? '<Nome>'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email ?? '<Email>'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup data-testid="dropdown-group-content">
          <DropdownMenuItem onClick={() => router.push('/settings/profile')}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          data-testid="logout-item"
          onClick={handleSignout}
        >
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const MemoizedUserNav = UserNav
