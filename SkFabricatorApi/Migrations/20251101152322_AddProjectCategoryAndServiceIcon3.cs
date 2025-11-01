using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SkFabricatorApi.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectCategoryAndServiceIcon3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Details",
                table: "TeamMembers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "TeamMembers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LinkedInUrl",
                table: "TeamMembers",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Details",
                table: "TeamMembers");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "TeamMembers");

            migrationBuilder.DropColumn(
                name: "LinkedInUrl",
                table: "TeamMembers");
        }
    }
}
