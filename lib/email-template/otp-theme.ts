const emailTemplate = `
<div style="font-family: 'Arial', sans-serif; max-width: 520px; margin: auto; padding: 25px; background: #0d1117; color: #ffffff; border-radius: 12px; border: 2px solid #0ef; box-shadow: 0 0 25px rgba(0, 255, 255, 0.4); text-align: center; position: relative; overflow: hidden;">
    
    <!-- Top glowing effect -->
    <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 80%; height: 5px; background: linear-gradient(90deg, transparent, #0ef, transparent); box-shadow: 0 0 15px rgba(0, 255, 255, 0.6); border-radius: 50%;"></div>
    
    <h2 style="color: #0ef; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin-bottom: 15px; text-shadow: 0 0 15px rgba(0, 255, 255, 0.7);">
        🔐 Linkshub Secure Verification
    </h2>
    
    <p style="color: #b3b3b3; font-size: 16px; margin-bottom: 20px; line-height: 1.6;">
        To ensure the security of your Linkshub account, please enter the verification code below.  
        This OTP is valid for <strong style="color: #0ef;">5 minutes</strong>. Do not share it with anyone.
    </p>
    
    <!-- Skewed OTP Box -->
    <div style="display: inline-block; padding: 18px 30px; font-size: 28px; font-weight: bold; background: linear-gradient(135deg, #0ef, #1e90ff); color: #0d1117; border-radius: 5px; transform: skewX(-15deg); box-shadow: 0 0 15px rgba(0, 255, 255, 0.7); letter-spacing: 3px; border: 2px solid #1e90ff;">
        {{OTP}}
    </div>

    <p style="color: #b3b3b3; font-size: 14px; margin-top: 20px;">
        Didn’t request this code? Ignore this email or contact <a href="#" style="color: #0ef; text-decoration: none; font-weight: bold;">support</a> immediately.
    </p>
    
    <!-- Divider with Cyber Lines -->
    <div style="position: relative; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #0ef, transparent); margin: 25px 0;"></div>
    
    <h3 style="color: #1e90ff; margin-bottom: 10px; text-shadow: 0 0 10px rgba(30, 144, 255, 0.6);">
        Why You Received This?
    </h3>
    <p style="color: #999; font-size: 14px; line-height: 1.5;">
        You are receiving this OTP because you are trying to log in or verify your Linkshub account. If this wasn't you,  
        we recommend resetting your password and enabling 2FA for extra security.
    </p>

    <!-- Cyber Lines -->
    <div style="position: relative; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #0ef, transparent); margin: 25px 0;"></div>

    <p style="font-size: 12px; color: #666;">
        Stay secure, stay connected.  
    </p>
    <p>
        <a href="{{unsubLink}}" style="color:red; font-size:12px;">Unsubscribe</a> if you wish no longer to receive emails
    </p>
    <p style="font-size: 12px; color: #555;">
        © 2025 Linkshub. All rights reserved.
    </p>
</div>

`;

// Export as a module
export default emailTemplate;
