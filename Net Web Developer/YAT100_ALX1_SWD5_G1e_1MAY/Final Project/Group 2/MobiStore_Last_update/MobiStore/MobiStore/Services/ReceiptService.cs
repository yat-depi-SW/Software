using MobiStore.Models;
using iText.IO.Font.Constants;
using iText.IO.Image;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using QRCoder;
using System.IO;

namespace MobiStore.Services
{
    public class ReceiptService
    {
        private const string storeName = "MobiStore";
        private const string taxNumber = "123456789";
        private const string logoPath = "wwwroot/images/icon.png"; // Adjust path to your logo

        public byte[] CreateReceiptPdf(Order order)
        {
            using (var ms = new MemoryStream())
            {
                PdfWriter writer = new PdfWriter(ms);
                PdfDocument pdfDoc = new PdfDocument(writer);
                Document document = new Document(pdfDoc);

                // Set fonts
                PdfFont headerFont = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD);
                PdfFont normalFont = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);

                // Add logo
                ImageData imageData = ImageDataFactory.Create(logoPath);
                Image logo = new Image(imageData).SetHeight(120).SetHorizontalAlignment(HorizontalAlignment.CENTER);
                document.Add(logo);

                // Add store name and tax registration number with styling
                //Paragraph storeParagraph = new Paragraph(storeName)
                //    .SetFont(headerFont)
                //    .SetFontSize(24)
                //    .SetBold()
                //    .SetTextAlignment(TextAlignment.CENTER)
                //    .SetFontColor(ColorConstants.BLUE);
                //document.Add(storeParagraph);

                document.Add(new Paragraph($"Tax Registration Number: {taxNumber}")
                    .SetTextAlignment(TextAlignment.CENTER)
                    .SetFont(normalFont)
                    .SetFontColor(ColorConstants.DARK_GRAY));

                // Add divider
                document.Add(new LineSeparator(new SolidLine()).SetMarginTop(10));

                // Add order header with bold and different colors
                document.Add(new Paragraph("Order Receipt")
                    .SetFont(headerFont)
                    .SetFontSize(18)
                    .SetBold()
                    .SetTextAlignment(TextAlignment.CENTER)
                    .SetFontColor(ColorConstants.BLUE)
                    .SetMarginTop(20));

                // Add order details with styling
                document.Add(new Paragraph($"Order ID: {order.Id}")
                    .SetFontColor(ColorConstants.BLACK)
                    .SetFont(headerFont)
                    .SetBold());

                document.Add(new Paragraph($"Client ID: {order.ClientId}")
                    .SetFont(normalFont)
                    .SetFontColor(ColorConstants.DARK_GRAY));

                document.Add(new Paragraph($"Order Date: {order.CreatedAt.ToString("MM/dd/yyyy")}")
                    .SetFont(normalFont)
                    .SetFontColor(ColorConstants.DARK_GRAY));

                document.Add(new Paragraph($"Order Status: {order.OrderStatus}")
                    .SetFontColor(ColorConstants.DARK_GRAY));

                document.Add(new Paragraph($"Payment Status: {order.PaymentStatus}")
                    .SetFontColor(order.PaymentStatus == "accepted" ? ColorConstants.GREEN : ColorConstants.RED)
                    .SetMarginBottom(20));

                // Add table for items with colorful header
                Table table = new Table(4, true);
                table.AddHeaderCell(new Cell().Add(new Paragraph("Product")).SetBackgroundColor(ColorConstants.BLUE).SetFontColor(ColorConstants.WHITE));
                table.AddHeaderCell(new Cell().Add(new Paragraph("Quantity")).SetBackgroundColor(ColorConstants.BLUE).SetFontColor(ColorConstants.WHITE));
                table.AddHeaderCell(new Cell().Add(new Paragraph("Unit Price")).SetBackgroundColor(ColorConstants.BLUE).SetFontColor(ColorConstants.WHITE));
                table.AddHeaderCell(new Cell().Add(new Paragraph("Total")).SetBackgroundColor(ColorConstants.BLUE).SetFontColor(ColorConstants.WHITE));

                foreach (var item in order.Items)
                {
                    table.AddCell(new Paragraph(item.Product.Name).SetFontColor(ColorConstants.BLACK));
                    table.AddCell(new Paragraph(item.Quantity.ToString()).SetFontColor(ColorConstants.BLACK));
                    table.AddCell(new Paragraph($"{item.UnitPrice}$").SetFontColor(ColorConstants.BLACK));
                    table.AddCell(new Paragraph($"{item.Quantity * item.UnitPrice}$").SetFontColor(ColorConstants.BLACK));
                }

                document.Add(table.SetMarginBottom(20));

                // Add total amount and shipping with borders and highlights
                decimal total = order.ShippingFee + order.Items.Sum(i => i.Quantity * i.UnitPrice);

                document.Add(new Paragraph($"Shipping Fee: {order.ShippingFee}$")
                    .SetFont(headerFont)
                    .SetFontColor(ColorConstants.DARK_GRAY));

                document.Add(new Paragraph($"Total: {total}$")
                    .SetFont(headerFont)
                    .SetFontSize(16)
                    .SetBold()
                    .SetFontColor(ColorConstants.BLACK)
                    .SetBorder(new SolidBorder(2))
                    .SetBackgroundColor(ColorConstants.LIGHT_GRAY)
                    .SetPadding(10)
                    .SetTextAlignment(TextAlignment.CENTER));

                document.Close();
                return ms.ToArray();
            }
        }

        /*public byte[] GenerateQRCode(string qrCodeData)
        {
            using (var ms = new MemoryStream())
            {
                using (var qrGenerator = new QRCodeGenerator())
                {
                    var qrCodeDataObj = qrGenerator.CreateQrCode(qrCodeData, QRCodeGenerator.ECCLevel.Q);
                    using (var qrCode = new QRCode(qrCodeDataObj))
                    {
                        using (var bitmap = qrCode.GetGraphic(20))
                        {
                            bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                        }
                    }
                }
                return ms.ToArray();
            }
        }*/
    }
}
