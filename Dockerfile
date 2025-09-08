FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# Copy csproj and restore dependencies
COPY API/API.csproj ./API/
RUN dotnet restore API/API.csproj

# Copy all source code
COPY . ./

# Publish the project
RUN dotnet publish API/API.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app

COPY --from=build /app/out ./

EXPOSE 80

ENTRYPOINT ["dotnet", "API.dll"]
