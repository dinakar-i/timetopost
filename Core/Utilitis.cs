public enum Status
{
    Unauthorized,
    Forbid,
    NotFound,
    NotValid,
    Authroized,
    Succeeded,
    Failed
}
public enum OrganizationRole
{
    Viewer, Editor, Admin, Owner
}

public record AddUserResult(bool Success, object Data, Status? Error);