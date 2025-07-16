import { format, parseISO } from "date-fns";
export const userInfoDesc = (user: any) => {
    
    const isoString = user?.createdAt;
    const dateJoined = isoString ? parseISO(isoString) : '';

    return [
        {
            key: 'firstName',
            label: 'First name',
            children: user?.firstName
        },
        {
            key: 'lastName',
            label: 'Last name',
            children: user?.lastName
        },
        {
            key: 'email',
            label: 'Email',
            children: user?.email
        },
        {
            key: 'member-since',
            label: 'Member since',
            children:  dateJoined ? format(dateJoined, 'yyyy-MM-dd HH:mm:ss') : ''
        }
    ]

}