using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SkFabricatorApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveServiceTypeFromInquiry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Inquiries",
                type: "TEXT",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Inquiries",
                type: "TEXT",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreferredContact",
                table: "Inquiries",
                type: "TEXT",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Subject",
                table: "Inquiries",
                type: "TEXT",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Inquiries");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Inquiries");

            migrationBuilder.DropColumn(
                name: "PreferredContact",
                table: "Inquiries");

            migrationBuilder.DropColumn(
                name: "Subject",
                table: "Inquiries");
        }
    }
}
