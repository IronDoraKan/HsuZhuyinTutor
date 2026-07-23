using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

namespace HsuZhuyinTutor
{
    internal static class Program
    {
        /// <summary>
        /// 應用程式的主要進入點。
        /// </summary>
        [STAThread]
        static void Main()
        {
            ApplicationConfiguration.Initialize();

            string basePath = AppDomain.CurrentDomain.BaseDirectory;
            string htmlPath = Path.Combine(basePath, "index.html");

            if (!File.Exists(htmlPath))
            {
                MessageBox.Show("找不到 index.html 檔案！請確認專案目錄完整。", "許氏注音練習器", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            try
            {
                Process.Start(new ProcessStartInfo
                {
                    FileName = htmlPath,
                    UseShellExecute = true
                });
            }
            catch (Exception ex)
            {
                MessageBox.Show($"啟動失敗: {ex.Message}", "錯誤", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
