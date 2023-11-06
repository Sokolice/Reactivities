using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Domain;
using Activity = Domain.Activity;

namespace Application.Activities
{
    public class ActivityValidator: AbstractValidator<Activity>
    {
        public ActivityValidator(){
            RuleFor(x=>x.Title).NotEmpty();
            RuleFor(x=>x.Description).NotEmpty();
            RuleFor(x=>x.Date).NotEmpty();
            RuleFor(x=>x.City).NotEmpty();
            RuleFor(x=>x.Venue).NotEmpty();
        }
        
    }
}