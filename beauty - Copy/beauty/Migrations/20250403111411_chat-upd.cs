using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace beauty.Migrations
{
    /// <inheritdoc />
    public partial class chatupd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ClientSeen",
                table: "Chats",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "MasterSeen",
                table: "Chats",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientSeen",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "MasterSeen",
                table: "Chats");
        }
    }
}
