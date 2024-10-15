export const ROLE_GUEST_ID = 0
export const ROLE_AMIN_ID = 1
export const ROLE_MANAGER_ID = 2
export const ROLE_USER_ID = 3

export const COMMOM_ROLE = {
    ADMIN: ROLE_AMIN_ID,
    MANAGER: ROLE_MANAGER_ID,
    USER: ROLE_USER_ID,
    ROLE_GUEST_ID: ROLE_GUEST_ID,
}

export const COMMON_ROLE_NAME = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    USER: 'user',
    GUEST: 'guest',
}

export const COMMON_ROLE_COLORS = {
    ADMIN: 'danger',
    MANAGER: 'warning',
    USER: 'default',
    GUEST: 'default',
}

export const ROLE_OPTIONS = [
    { label: COMMON_ROLE_NAME.ADMIN, value: COMMOM_ROLE.ADMIN },
    { label: COMMON_ROLE_NAME.MANAGER, value: COMMOM_ROLE.MANAGER },
    { label: COMMON_ROLE_NAME.USER, value: COMMOM_ROLE.USER },
    { label: COMMON_ROLE_NAME.GUEST, value: COMMOM_ROLE.ROLE_GUEST_ID },
]

export const MAPPED_ROLE_COLORS = {
    [COMMOM_ROLE.ADMIN]: { color: COMMON_ROLE_COLORS.ADMIN, name: COMMON_ROLE_NAME.ADMIN },
    [COMMOM_ROLE.MANAGER]: { color: COMMON_ROLE_COLORS.MANAGER, name: COMMON_ROLE_NAME.MANAGER },
    [COMMOM_ROLE.USER]: { color: COMMON_ROLE_COLORS.USER, name: COMMON_ROLE_NAME.USER },
    [COMMOM_ROLE.ROLE_GUEST_ID]: { color: COMMON_ROLE_COLORS.GUEST, name: COMMON_ROLE_NAME.GUEST },
}
