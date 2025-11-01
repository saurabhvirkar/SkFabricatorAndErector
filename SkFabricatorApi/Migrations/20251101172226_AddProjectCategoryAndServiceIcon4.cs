using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SkFabricatorApi.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectCategoryAndServiceIcon4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "TeamMembers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Projects",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "TeamMembers");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Projects");
        }
    }
}
