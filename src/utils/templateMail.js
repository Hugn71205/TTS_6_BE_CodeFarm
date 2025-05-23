// templateMail.js

export default function templateMail(type, template) {
  if (type === 'Verify') {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2>Xin chào,</h2>
        <p>Cảm ơn bạn đã đăng ký tài khoản tại cửa hàng chúng tôi.</p>
        <p>Mã xác minh của bạn là:</p>
        <h1 style="color: #2a9d8f;">${template.code}</h1>
        <p>Vui lòng nhập mã này để hoàn tất đăng ký tài khoản.</p>
        <p>Nếu bạn không thực hiện yêu cầu này, hãy bỏ qua email này.</p>
        <hr>
        <p style="font-size: 0.9em; color: #999;">Đội ngũ hỗ trợ - Shop nước hoa</p>
      </div>
    `;
  }


  return `<p>Nội dung email không xác định.</p>`;
}


