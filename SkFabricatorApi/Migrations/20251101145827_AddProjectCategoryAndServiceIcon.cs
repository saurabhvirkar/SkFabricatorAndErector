using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SkFabricatorApi.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectCategoryAndServiceIcon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Services",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Services",
                newName: "Summary");

            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "Services",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Services",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Projects",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Icon",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "Summary",
                table: "Services",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Services",
                newName: "Title");
        }
    }
}
