FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env

WORKDIR /app

COPY ./oauth.csproj .
RUN dotnet restore

COPY . . 

RUN dotnet publish oauth.csproj -c Release -o ./obj/Docker/publish

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-alpine AS release
RUN addgroup dotnet && \
    adduser -D -G dotnet -h /home/dotnet dotnet && \
    apk --no-cache add ca-certificates wget

USER dotnet

WORKDIR /home/dotnet/app
ENV ASPNETCORE_URLS=http://+:9999
COPY --from=build-env /app/obj/Docker/publish .

ENTRYPOINT dotnet oauth.dll