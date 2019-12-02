using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using sensor_radix_api.Models;

namespace sensor_radix_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                if(env.isDevelopment()) 
                {
                    options.AddPolicy("AllowMyOrigin", 
                        builder => builder.WithOrigins("http://localhost:1234",
                                                    "http://localhost:5000",
                                                    "http://10.0.0.100:1234")
                                          .AllowAnyMethod()
                                          .AllowAnyHeader()); 
                }
                else {
                    builder => builder.WithOrigins(Environment.GetEnvironmentVariable("CLIENT_URL"))
                                          .AllowAnyMethod()
                                          .AllowAnyHeader()); 
                }
                options.AddPolicy("AllowAnyOrigin",
                        builder => builder.AllowAnyOrigin());
            });
            if(env.IsDevelopment()) {
                services.AddDbContext<SensorContext>(opt =>
                    opt.UseInMemoryDatabase("SensorList"));
            }
            else {
                services.AddDbContext<SensorContext>(opt => 
                    opt.UseSqlServer(Environment.GetEnvironmentVariable("ASPNETCORE_SQLCONNSTR")));
            }
            services.AddControllers();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            // app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseCors(options => {
                options.WithOrigins("http://localhost:1234",
                                    "http://localhost:5000",
                                    "http://10.0.0.100:1234");
            });

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
