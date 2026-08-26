# -*- coding: utf-8 -*-
"""
极速刷题 - iPhone 局域网测试服务器
专为 192.168.3.x 网段适配
"""

import http.server
import socketserver
import socket
import os
import sys

PORT = 8080

def get_best_ip():
    target_ip = "192.168.3.100"
    try:
        hostname = socket.gethostname()
        all_ips = socket.gethostbyname_ex(hostname)[2]
        for ip in all_ips:
            if ip.startswith("192.168.3."):
                return ip
        for ip in all_ips:
            if ip.startswith("192.168.") and not ip.startswith("192.168.56."):
                return ip
        if all_ips:
            return all_ips[0]
    except Exception:
        pass
    return target_ip

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    local_ip = get_best_ip()
    access_url = f"http://{local_ip}:{PORT}"
    
    print("=" * 64)
    print("  🚀 极速刷题 (iPhone 专享 APP) 本地服务已启动！")
    print("=" * 64)
    print(f"  📱 iPhone 手机专属访问网址:   {access_url}")
    print(f"  💻 电脑本地浏览器访问:         http://localhost:{PORT}")
    print("=" * 64)
    print("  【📱 iPhone 极速上手与安装步骤】")
    print(f"  1. 确保 iPhone 连接到与电脑相同的 Wi-Fi（192.168.3.x 网段）。")
    print(f"  2. 打开 iPhone 自带的 Safari 浏览器，输入网址：")
    print(f"     👉  {access_url}")
    print(f"  3. 即可开始刷题！")
    print(f"  4. 点击 Safari 底部「分享」按钮（方框加向上箭头 ⎋）->「添加到主屏幕」，")
    print(f"     可在手机桌面生成 APP 图标，获得全屏免地址栏原生体验！")
    print("=" * 64)
    print("  按 Ctrl + C 可随时停止服务。\n")

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  服务已停止。")
