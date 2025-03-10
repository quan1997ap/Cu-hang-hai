export enum UserRoles {
    sys_admin = 0,
    user = 1,
    officer = 2,
    leader = 3
}

export const UserRoleOptions = [
    { id: UserRoles.sys_admin, name: 'Sys_admin' },
    { id: UserRoles.user, name: 'User' },
    { id: UserRoles.officer, name: 'Officer' },
    { id: UserRoles.leader, name: 'Leader' }
]

export enum UserStatuses {
    active = 0,
    inactive = 1
}

export const UserStatusOptions = [
    { id: UserStatuses.active, name: 'Active', background: '#008000', color: '#fff' },
    { id: UserStatuses.inactive, name: 'Inactive', background: '#99a1b7', color: '#333' }
]