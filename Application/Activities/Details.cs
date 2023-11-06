using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query: IRequest<Result<Activity>> 
        {
            public Guid Id { get; set; }

        }

        public class Handler: IRequestHandler<Query, Result<Activity>>{
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            public Handler(DataContext context, ILogger<List> logger)
            {
                _logger = logger;
                _context = context;
            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                    /*try
                    {
                        for(var i =0; i<10; i++)
                        {
                            cancellationToken.ThrowIfCancellationRequested();
                            await Task.Delay(1000, cancellationToken);
                            _logger.LogInformation($"Task {i} has completed");
                        }
                    }
                    catch (Exception)
                    {
                        
                        _logger.LogInformation("Task was cancelled");
                    }*/

                    var activity = await _context.Activities.FindAsync(request.Id);

                    return Result<Activity>.Success(activity);

            }
        }
    }
}