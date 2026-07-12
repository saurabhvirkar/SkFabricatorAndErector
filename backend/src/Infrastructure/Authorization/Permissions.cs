namespace SkFabricator.Infrastructure.Authorization
{
    public static class Permissions
    {
        public static class Projects
        {
            public const string Read = "Projects.Read";
            public const string Create = "Projects.Create";
            public const string Update = "Projects.Update";
            public const string Delete = "Projects.Delete";
        }

        public static class Services
        {
            public const string Read = "Services.Read";
            public const string Create = "Services.Create";
        }
    }
}
