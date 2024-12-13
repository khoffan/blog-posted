import Swal from "sweetalert2";

export function Alert(message, type, position) {
    return Swal.fire({
        position: position,
        icon: type,
        text: message,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
    });
}
