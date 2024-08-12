org 0x7c00
mov [BOOT_DISK], dl
; setting up the stack
xor ax, ax
mov es, ax
mov ds, ax
mov bp, 0x8000
mov sp, bp
; reading the disk
mov bx, 0x7e00
mov ah, 2
mov al, 6
mov ch, 0
mov dh, 0
mov cl, 2
mov dl, [BOOT_DISK]
int 0x13
jmp 0x7e00
db 0
BOOT_DISK:

; magic padding
times 510-($-$$), db 0
dw 0xaa55
