const express = require('express');
const router = express.Router();

// 登入路由
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // 簡單的模擬登入驗證
  if (username === 'admin' && password === 'password') {
    res.json({
      success: true,
      message: '登入成功',
      user: {
        id: 1,
        username: 'admin',
        name: '系統管理員',
        role: 'admin'
      },
      token: 'mock-jwt-token'
    });
  } else {
    res.status(401).json({
      success: false,
      message: '帳號或密碼錯誤'
    });
  }
});

// 登出路由
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: '登出成功'
  });
});

// 取得用戶資訊
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    user: {
      id: 1,
      username: 'admin',
      name: '系統管理員',
      role: 'admin',
      department: '資訊部',
      email: 'admin@mx.com'
    }
  });
});

// 驗證token
router.post('/verify', (req, res) => {
  const { token } = req.body;
  
  if (token === 'mock-jwt-token') {
    res.json({
      success: true,
      valid: true,
      user: {
        id: 1,
        username: 'admin',
        name: '系統管理員',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      valid: false,
      message: 'Token無效'
    });
  }
});

module.exports = router; 